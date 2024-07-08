// import React from "react";
// import { StyleSheet, View } from "react-native";


// import { MARGIN, SIZE } from "./Config";

// const styles = StyleSheet.create({
//   container: {
//     width: SIZE -20,
//     height: 150,
//     backgroundColor:'white',
//     borderRadius:20,
//     shadowColor:'#000',
//     shadowOffset:{width:0,height:1},
//     shadowOpacity:0.25,
//     shadowRadius:2,
//     elevation:5,
//     padding:14,
//     alignSelf:'center'
//   },
// });
// interface TileProps {
//   id: string;
 
//   onLongPress: () => void;
// }

// const Tile = ({ id }: TileProps) => {
//   return (
//     <View style={styles.container} pointerEvents="none">
//       <WebView
//         source={{ id }}
//         style={{ flex: 1, margin: MARGIN * 2, borderRadius: MARGIN }}
//       />
//     </View>
//   );
// };

// export default Tile;