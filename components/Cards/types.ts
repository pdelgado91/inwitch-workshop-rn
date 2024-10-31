export const cardStatus = [ 'created', 'assigned', 'active', 'reserved', 'cancelled', 'blocked' ] as const

export type CardStatus = typeof cardStatus[number]

export interface Card {
  cardIdentifier: string
  entityId: string
  status: CardStatus
  statusReason: string
  statusDescription: string
  issueDate: string
  assignedDate: string
  type: string
  productId: string
  brand: string
  balanceType: string
  currency: string
  expiry_mm_yyyy: string
  last4: string
  paymentMethodReference: string
  maskedPan: string
  profile: string
  batchId: string
  metadata: IMetaData[]
  expanded_card_info: ExpandedCardInfo
  tracking: Tracking
}

export interface IMetaData {
  key: string
  value: string
}

export interface ExpandedCardInfo {
  cardInfoEncrypted: boolean
  pan: string
  cvv: string
}

export interface Tracking {
  billNo: string
  orderType: string
  orderNo: string
  oldOrderNo: string
  latestStatus: string
  latestStatusTime: string
  latestSite: string
  locusType: string
  locus: ILocus[]
}

export interface ILocus {
  latestStatus: string
  latestStatusTime: string
  latestSite: string
  locusDetailed: string
  locusType: string
  signedBy: string
  customerName: string
}