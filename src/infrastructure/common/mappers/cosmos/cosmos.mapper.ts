import {
  AppCosmosBlock,
  AppCosmosTransaction,
  CosmosBlockResponse,
  CosmosTxEvent,
  CosmosTxResult,
} from '@types';

const findSenderInEvents = (events: CosmosTxEvent[]): string => {
  for (const event of events) {
    if (event.type === 'message') {
      for (const attr of event.attributes) {
        if (Buffer.from(attr.key, 'base64').toString('utf-8') === 'sender') {
          return Buffer.from(attr.value, 'base64').toString('utf-8');
        }
      }
    }
  }

  return 'Отправитель не найден';
};

export const mapCosmosBlock = (
  rawBlock: CosmosBlockResponse,
): AppCosmosBlock => {
  return {
    height: parseInt(rawBlock.block.header.height, 10),
    time: rawBlock.block.header.time,
    hash: rawBlock.block_id.hash,
    proposerAddress: rawBlock.block.header.proposer_address,
  };
};

export const mapCosmosTransaction = (
  rawTx: CosmosTxResult,
  blockData: AppCosmosBlock,
  hash: string,
): AppCosmosTransaction => {
  const sender = findSenderInEvents(rawTx.tx_result.events);

  return {
    hash: hash,
    height: parseInt(rawTx.height, 10),
    time: blockData.time,
    gasUsed: rawTx.tx_result.gas_used,
    gasWanted: rawTx.tx_result.gas_wanted,
    fee: rawTx.tx?.auth_info?.fee?.amount ?? [],
    sender: sender,
  };
};
