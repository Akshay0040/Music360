// import React from 'react';
// import {
//   Platform,
//   KeyboardAvoidingView,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
// } from 'react-native';

// const ResponsiveWrapper = ({ children }) => {
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#221224' }}>
//       <StatusBar barStyle="light-content" backgroundColor="#221224" />
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'android' ? 50 : 0}
//       >
//         <ScrollView
//           contentContainerStyle={{ flexGrow: 1 }}
//           keyboardShouldPersistTaps="handled"
//         >
//           {children}
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };
// // console.log("ResponsiveWrapper loaded");
// export default ResponsiveWrapper;
