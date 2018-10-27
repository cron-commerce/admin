import {Button, Heading, Page, Select, TextField} from '@shopify/polaris'
import {ResourcePicker} from '@shopify/polaris/embedded'
import {Field, FieldArray, Form, Formik} from 'formik'
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
  }

  public render() {
    return <Query query={QUERY}>
      {({data, loading}) => {
        if (loading) { return <div>Loading...</div> }
        const {newSubscribableOptions} = data

        return <Page title='New Subscribable'>
          <Header />

          <Heading>New Subscribable</Heading>

          <Formik
            initialValues={{
              products: [],
              sizes: [],
              type: '',
            }}
            onSubmit={(p) => {
              console.log(p)
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
        </Page>
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
