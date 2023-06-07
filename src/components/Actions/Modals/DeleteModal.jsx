import { Modal, Message, Button } from '@arco-design/web-react';
import "./DeleteModal.css"

function handleAction(content) {
  Modal.confirm({
    title: 'Confirm deletion',
    content: content,
    okText: 'Delete',
    okButtonProps: {
      status: 'danger',
    },
    onOk: async () => {
      try {
            return await new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            });
        } catch (e) {
            Message.error({
                content: 'Failed to delete!',
            });
            throw e;
        }
    },
  });
}

const DeleteModal = ({content}) => {
  return (
    <Button 
    type='secondary' 
    onClick={() => handleAction(content)} 
    style={{
        width: '100%', 
        background: "transparent", 
        textAlign: 'left'
    }}>
      Delete
    </Button>
  );
};

export default DeleteModal;
