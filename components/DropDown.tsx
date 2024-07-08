import { View,Text } from "react-native";
import * as DropDownMenu from 'zeego/dropdown-menu';
import RoundButton from "./RoundButton";

const Dropdown = ()=>{
    return(
       <DropDownMenu.Root>
        <DropDownMenu.Trigger>
            <RoundButton icon={'ellipsis-horizontal'} text={'More'}/>
        </DropDownMenu.Trigger>

        {/* <DropDownMenu.Content>
            <DropDownMenu.Item key="statement"></DropDownMenu.Item>
        </DropDownMenu.Content> */}
       </DropDownMenu.Root>
    )
}

export default Dropdown;