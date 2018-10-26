import {Button, Form, FormLayout, Heading, Page, ResourcePicker, Select} from '@shopify/polaris'
import gql from 'graphql-tag'
import {Component} from 'react'
import {Query} from 'react-apollo'

import Header from '../../components/header'
import updateState from '../../lib/update-state'

const QUERY = gql`
  query newSubscribableOptions {
    newSubscribableOptions {
      types
    }
  }
`

export default class NewSubscribable extends Component<{}> {
  public state = {
    isProductsPickerOpen: false,
    typeInput: '',
  }

  public render() {
    return <Query query={QUERY}>
      {({data, loading}) => {
        if (loading) { return <div>Loading...</div> }
        const {newSubscribableOptions} = data

        return <Page title='New Subscribable'>
          <Header />

          <Heading>New Subscribable</Heading>

          <Form onSubmit={this.handleSubmit}>
            <FormLayout>
              <Select
                label='Type'
                onChange={this.handleTypeChange}
                options={newSubscribableOptions.types}
                placeholder='Select a type'
                value={this.state.typeInput}
              />
            </FormLayout>

            <ResourcePicker
              allowMultiple={this.state.typeInput === 'Bundle'}
              open={this.state.isProductsPickerOpen}
              onSelection={this.handleProductsPickerSelection}
              onCancel={this.handleProductsPickerCancel}
              resourceType='Product'
            />
            <Button onClick={this.handleOpenProductsPicker}>Choose products</Button>

            <Button submit>Submit</Button>
          </Form>
        </Page>
      }}
    </Query>
  }

  private handleOpenProductsPicker = () => this.setState(updateState({isProductsPickerOpen: true}))
  private handleProductsPickerCancel = () => this.setState(updateState({isProductsPickerOpen: false}))
  private handleProductsPickerSelection = p => console.log(p)

  private handleTypeChange = (typeInput: string) => this.setState(updateState({typeInput}))

  private handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }
}
