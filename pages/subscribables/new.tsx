import {Button, Heading, Page, Select, TextField} from '@shopify/polaris'
import {ResourcePicker} from '@shopify/polaris/embedded'
import {Field, FieldArray, Form, Formik} from 'formik'
import gql from 'graphql-tag'
import {Component} from 'react'
import {Mutation, Query} from 'react-apollo'

import Header from '../../components/header'
import updateState from '../../lib/update-state'

const QUERY = gql`
  query newSubscribableOptions {
    newSubscribableOptions {
      types
    }
  }`

const MUTATION = gql`
  mutation createSubscribable($input: SubscribableInput!) {
    createSubscribable(input: $input) {
      id
    }
  }`

const transformInputForMutation = input => ({
  products: input.products.map(product => ({
    shopifyProductId: product.id,
  })),
  sizes: input.sizes.map(size => ({
    numVariants: parseInt(size.numVariants, 10),
    price: size.price,
  })),
  type: input.type,
})

export default class NewSubscribable extends Component<{}> {
  public state = {
    isProductsPickerOpen: false,
  }

  public render() {
    return <Query query={QUERY}>
      {({data, loading}) => {
        if (loading) { return <div>Loading...</div> }
        const {newSubscribableOptions} = data

        return <Mutation mutation={MUTATION}>
          {(createSubscribable, {data: mutationData, error: mutationError, loading: mutationLoading}) => {
            return <Page title='New Subscribable'>
              <Header />

              <Heading>New Subscribable</Heading>

              <Formik
                initialValues={{
                  products: [],
                  sizes: [],
                  type: '',
                }}
                onSubmit={input => {
                  createSubscribable({variables: {input: transformInputForMutation(input)}})
                }}
                render={({
                  handleChange,
                  setFieldValue,
                  values,
                }) => <Form>
                  <Select
                    label='Type'
                    name='type'
                    onChange={val => setFieldValue('type', val)}
                    options={newSubscribableOptions.types}
                    placeholder='Select a type'
                    value={values.type}
                  />

                  <div>Products: {values.products.map(product => product.title).join(', ')}</div>
                  <ResourcePicker
                    allowMultiple={values.type === 'Bundle'}
                    open={this.state.isProductsPickerOpen}
                    onSelection={this.handleProductsPickerSelection(setFieldValue)}
                    onCancel={this.closeProductsPicker}
                    products
                  />
                  <Button onClick={this.handleOpenProductsPicker}>Choose products</Button>

                  <FieldArray
                    name='sizes'
                    render={({push, remove}) => <div>
                      {values.sizes.map((size, idx) => <div key={idx}>
                        <TextField
                          label='Size'
                          name='numVariants'
                          onChange={numVariants => setFieldValue(`sizes.${idx}.numVariants`, numVariants)}
                          type='number'
                          value={size.numVariants}
                        />
                        <TextField
                          label='Price'
                          name='price'
                          onChange={price => setFieldValue(`sizes.${idx}.price`, price)}
                          type='text'
                          value={size.price}
                        />
                        <Button onClick={() => remove(idx)}>Remove size</Button>
                      </div>)}
                      <Button onClick={() => push({numVariants: '', price: ''})}>Add size</Button>
                    </div>}
                  />

                  <div>
                    <Button submit>Submit</Button>
                  </div>
                </Form>}
              />
            </Page>}}
        </Mutation>
      }}
    </Query>
  }

  private closeProductsPicker = () => this.setState(updateState({isProductsPickerOpen: false}))
  private handleOpenProductsPicker = () => this.setState(updateState({isProductsPickerOpen: true}))
  private handleProductsPickerSelection = (setFieldValue) => ({products}) => {
    setFieldValue('products', products)
    this.closeProductsPicker()
  }
}
