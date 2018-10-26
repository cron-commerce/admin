import NextLink from 'next/link'
import {Component} from 'react'

interface Props {
  children: any,
  url: string,
}

export default class Link extends Component<Props> {
  public render() {
    return <NextLink href={this.props.url}>
      <a>{this.props.children}</a>
    </NextLink>
  }
}
