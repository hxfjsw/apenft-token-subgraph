import { BigInt } from "@graphprotocol/graph-ts"
import {
  ApenftTokenContract,
  Deprecate,
  RequestScheduled,
  RequestExecuted,
  Issue,
  Redeem,
  Cancelled,
  DelayTimeChange,
  Pause,
  Unpause,
  OwnershipTransferred,
  Approval,
  Transfer
} from "../generated/ApenftTokenContract/ApenftTokenContract"
import { ExampleEntity } from "../generated/schema"

export function handleDeprecate(event: Deprecate): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.newAddress = event.params.newAddress

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.name(...)
  // - contract.approve(...)
  // - contract.deprecated(...)
  // - contract.totalSupply(...)
  // - contract.transferFrom(...)
  // - contract.upgradedAddress(...)
  // - contract.decimals(...)
  // - contract.maximumFee(...)
  // - contract._totalSupply(...)
  // - contract.isOperation(...)
  // - contract.paused(...)
  // - contract.decreaseApproval(...)
  // - contract.isOperationDone(...)
  // - contract.balanceOf(...)
  // - contract.calcFee(...)
  // - contract.actions(...)
  // - contract.owner(...)
  // - contract.symbol(...)
  // - contract.transfer(...)
  // - contract.nonce(...)
  // - contract.isOperationPending(...)
  // - contract.getTimestamp(...)
  // - contract.oldBalanceOf(...)
  // - contract.isOperationReady(...)
  // - contract.increaseApproval(...)
  // - contract.allowance(...)
  // - contract.basisPointsRate(...)
  // - contract.MAX_UINT(...)
  // - contract.getMinDelay(...)
}

export function handleRequestScheduled(event: RequestScheduled): void {}

export function handleRequestExecuted(event: RequestExecuted): void {}

export function handleIssue(event: Issue): void {}

export function handleRedeem(event: Redeem): void {}

export function handleCancelled(event: Cancelled): void {}

export function handleDelayTimeChange(event: DelayTimeChange): void {}

export function handlePause(event: Pause): void {}

export function handleUnpause(event: Unpause): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleApproval(event: Approval): void {}

export function handleTransfer(event: Transfer): void {}
