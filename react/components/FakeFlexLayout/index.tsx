import React from 'react'
import './FakeFlexLayout.css'

interface FakeFlexLayoutProps {
  children: any
  blockClass: string
}

const FakeFlexLayout: StorefrontFunctionComponent<FakeFlexLayoutProps> = ({
  children,
  blockClass,
}) => {
  return <div className={`${blockClass} fake-flex-layout`}>{children}</div>
}

export default FakeFlexLayout
