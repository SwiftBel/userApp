import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import RootSignUp from './SignUpNavigator' 
import ProfileNavigator from './ProfileNavigator';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
function RootNavigator() {
    return (
  
      <NavigationContainer>
       
        <RootSignUp/>
       
      </NavigationContainer>
    );
  }
  export default RootNavigator;