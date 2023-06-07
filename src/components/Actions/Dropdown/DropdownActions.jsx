import { Button, Menu } from "@arco-design/web-react";
import DropdownComponent from "@arco-design/web-react/es/Dropdown";
import DeleteModal from "../Modals/DeleteModal";

// importing styles
import "./DropdownActions.css"

const DropdownActions = ({actions}) => {
    const dropList = (
        <Menu>
          <Menu.Item key='Delete'>
            <DeleteModal content={actions.delete}/>
          </Menu.Item>
        </Menu>
    );

    return(
        <DropdownComponent droplist={dropList} trigger='click' position='br'>
            <Button
            type='secondary'>
                <i className="bi bi-three-dots-vertical"></i>
            </Button>
        </DropdownComponent>
    )
}

export default DropdownActions;