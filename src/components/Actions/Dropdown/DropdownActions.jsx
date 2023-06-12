import { Button, Menu } from "@arco-design/web-react";
import DropdownComponent from "@arco-design/web-react/es/Dropdown";
import DeleteModal from "../Modals/Delete/DeleteModal";

// importing styles
import "./DropdownActions.css";
import EditModal from "../Modals/Edit/EditModal";

const DropdownActions = ({ actions, type, payload }) => {
  const dropList = (
    <Menu>
      <Menu.Item key="Delete">
        <DeleteModal content={actions.delete} type={type} payload={payload} />
      </Menu.Item>

      {type === "sharedTrips" && (
        <Menu.Item key="Cancel Trip">
          <EditModal content={actions.cancel} type={type} payload={payload} />
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <DropdownComponent
      style={{ padding: 0 }}
      droplist={dropList}
      trigger="click"
      position="br"
    >
      <Button type="secondary">
        <i className="bi bi-three-dots-vertical"></i>
      </Button>
    </DropdownComponent>
  );
};

export default DropdownActions;
