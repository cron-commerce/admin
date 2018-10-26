import {Button, Form, FormLayout, Heading, Page, TextField} from '@shopify/polaris'
import gql from 'graphql-tag'
import {Component} from 'react'
import {Query} from 'react-apollo'

import Header from '../../components/header'
import {handleInputChangeToStateUpdate} from '../../lib/update-state'

const QUERY = gql`
  query newSubscribableOptions {
    newSubscribableOptions {
      types
    }
  }
`

export default class NewSubscribable extends Component<{}> {
  public state = {
    nameInput: '',
  }

  private handleInputChangeToStateUpdate = handleInputChangeToStateUpdate.bind(this)

  public render() {
    return <Query query={QUERY}>
      {({data, loading}) => {
        if (loading) { return <div>Loading...</div> }

        console.log(data)

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
      }}
    </Query>
  }

  private handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }
}
