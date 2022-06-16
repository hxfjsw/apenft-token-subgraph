# ERC20 subgraph

https://thegraph.com/studio/subgraph/apenft-token/

查询 0x13ebc0a1fee2f7e5a1809712957229b70fd77bf2 代币 持有量前5名

```graphql
{
    balances(first:5,where:{tokenAddress:"0x13ebc0a1fee2f7e5a1809712957229b70fd77bf2"}, orderBy:amount,orderDirection :desc){
        tokenAddress
        user{
            id
        }
        amount
    }
}
```
