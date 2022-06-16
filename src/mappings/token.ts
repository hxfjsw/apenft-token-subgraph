import {
  ERC20,
  Transfer as TransferEvent,
  Approval as ApprovalEvent,
} from '../../generated/TestToken/ERC20';

import {Address, BigInt, Bytes} from '@graphprotocol/graph-ts';

import {getToken, getTransfer, getAllowance, getUser, getBalance} from './helpers';

export function handleTransfer(event: TransferEvent): void {
  let txHash = event.transaction.hash;
  let timestamp = event.block.timestamp;
  let address = event.address;

  let token = getToken(address);
  token.save();

  let fromUser = getUser(event.params.from, address);
  fromUser.save();

  let toUser = getUser(event.params.to, address);
  toUser.save();

  let transfer = getTransfer(txHash);
  transfer.timestamp = timestamp;
  transfer.from = fromUser.id;
  transfer.to = toUser.id;
  transfer.value = event.params.value;
  transfer.token = token.id;
  transfer.save();

  let erc20 = ERC20.bind(address);
  let balance_from = erc20.try_balanceOf(event.params.from);
  let balance_to = erc20.try_balanceOf(event.params.to);

  let balance_from_entity = getBalance(event.params.from,address)
  balance_from_entity.user = fromUser.id;
  balance_from_entity.tokenAddress = address;
  balance_from_entity.amount =  balance_from.reverted ? BigInt.fromI32(0) : balance_from.value;
  balance_from_entity.save()

  let balance_to_entity = getBalance(event.params.to,address)
  balance_to_entity.user = toUser.id;
  balance_to_entity.tokenAddress = address;
  balance_to_entity.amount =  balance_from.reverted ? BigInt.fromI32(0) : balance_to.value;
  balance_to_entity.save()
}

export function handleApproval(event: ApprovalEvent): void {
  let timestamp = event.block.timestamp;
  let address = event.address;

  let token = getToken(address);
  token.save();

  let ownerUser = getUser(event.params.owner, address);
  ownerUser.save();

  let spenderUser = getUser(event.params.spender, address);
  spenderUser.save();

  let allowance = getAllowance(
    address,
    event.params.owner,
    event.params.spender,
  );
  allowance.timestamp = timestamp;
  allowance.owner = ownerUser.id;
  allowance.spender = spenderUser.id;
  allowance.value = event.params.value;
  allowance.token = token.id;
  allowance.save();
}
