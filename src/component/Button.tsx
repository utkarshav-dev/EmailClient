import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon, { Icons } from "../contant/icons";
// import { FSize, TColor, ThameFont } from "../Constants/them
export function OutlineButton({
  text,
  onPress,
  style,
  icon,
  right,
  left,
}) {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style, {
        width: '45%', backgroundColor: 'orange', borderRadius: 15, paddingBottom: 10, paddingTop: 10, marginVertical: 10,borderWidth:1,borderColor:'orange',
        elevation: 10, shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,flexDirection:'row',justifyContent:'center',alignItems:'center'
      }]}>
       { right && (<Icon type={Icons.Ionicons} name={icon} color={'white'} size={20}/>)}     
      <Text style={{ fontWeight: '500', color: 'white',marginLeft:5, fontSize: 18, textAlign: 'center', textTransform: 'capitalize' }}>{text}</Text>
      { left && (<Icon type={Icons.Ionicons} name={icon} style={{marginLeft:5}} color={'white'} size={20}/>)} 
    </TouchableOpacity>
  )
}


const Button = { OutlineButton }

export default Button

const styles = StyleSheet.create({})