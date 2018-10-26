import {Button, Form, FormLayout, Heading, Page, TextField} from '@shopify/polaris'
import {Component} from 'react'

import Header from '../../components/header'
import {handleInputChangeToStateUpdate} from '../../lib/update-state'

export default class NewSubscribable extends Component<{}> {
  public state = {
    nameInput: '',
  }

  private handleInputChangeToStateUpdate = handleInputChangeToStateUpdate.bind(this)

  public render() {
    return <Page title='New Subscribable'>
      <Header />

      <Heading>New Subscribable</Heading>

      <Form onSubmit={this.handleSubmit}>
        <FormLayout>
          <TextField label='name' onChange={this.handleInputChangeToStateUpdate('nameInput')} type='text' value={this.state.nameInput} />
        </FormLayout>
        <Button submit>Submit</Button>
      </Form>
    </Page>
  }

  private handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }
}
