import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import authenticationAPI from '../../../apis/authApi';
import {Facebook, Google} from '../../../assets/svgs';
import {
  ButtonComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {LoadingModal} from '../../../modals';
import {addAuth} from '../../../redux/reducers/authReducer';
import {Settings, LoginManager, Profile} from 'react-native-fbsdk-next';
import {appColors} from '../../../Constants/appColors.ts';
import {fontFamilies} from '../../../Constants/fontFamilies.ts';

GoogleSignin.configure({
  webClientId:
    '511766291377-5en92vsame1mh1u36i6e92p2nh17sm8a.apps.googleusercontent.com',
  iosClientId:
    '511766291377-3lr7gm8vnlgjg0tn8h6untl3kj7f0d79.apps.googleusercontent.com',
});
Settings.setAppID('978506370721025');

const SocialLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const api = `/google-signin`;
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.user;

      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        user,
        'post',
      );

      dispatch(addAuth(res.data));

      await AsyncStorage.setItem('auth', JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);

      if (result.isCancelled) {
        console.log('Login cancel');
      } else {
        const profile = await Profile.getCurrentProfile();

        if (profile) {
          setIsLoading(true);
          const data = {
            name: profile.name,
            givenName: profile.firstName,
            familyName: profile.lastName,
            email: profile.userID,
            photo: profile.imageURL,
          };

          const res: any = await authenticationAPI.HandleAuthentication(
            api,
            data,
            'post',
          );

          dispatch(addAuth(res.data));

          await AsyncStorage.setItem('auth', JSON.stringify(res.data));

          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SectionComponent>
      <TextComponent
        styles={{textAlign: 'center'}}
        text="OR"
        color={appColors.gray4}
        size={16}
        font={fontFamilies.medium}
      />
      <SpaceComponent height={16} />

      <ButtonComponent
        type="primary"
        onPress={handleLoginWithGoogle}
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Google"
        textFont={fontFamilies.regular}
        iconFlex="left"
        icon={<Google />}
      />

      <ButtonComponent
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Facebook"
        textFont={fontFamilies.regular}
        onPress={handleLoginWithFacebook}
        iconFlex="left"
        icon={<Facebook />}
      />
      <LoadingModal visible={isLoading} />
    </SectionComponent>
  );
};

export default SocialLogin;

