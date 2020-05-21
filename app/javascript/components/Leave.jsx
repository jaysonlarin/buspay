import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { toast } from 'react-semantic-toasts';

class ModalLeave extends React.Component {
  state = {
    showModal: false
  };

  openModal = () => {
    this.setState({ showModal: true })
  };

  closeModal = () => {
    this.setState({ showModal: false }  );
  };

  leaving = () => {
    this.setState({ showModal: false }  );
    toast({
      type: 'error',
      icon: 'shield',
      description: 'You left me!',
      animation: 'bounce',
      time: 5000
    });
  };

  render() {
    const {
      showModal
    } = this.state;

    return (
      <Modal
        open={showModal}
        trigger={
          <Button className='ui button negative' onClick={ this.openModal }>Leave</Button>
        }>
        <Header icon='archive' content='Leaving so soon?' />
        <Modal.Content>
          <p>
            Why leave now? Are you sure you wanna close this window?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.closeModal} >
            <Icon name='remove' /> No
          </Button>
          <Button color='green' onClick={this.leaving} >
            <Icon name='checkmark'/> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
};

export default ModalLeave;