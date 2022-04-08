
import {
    Token,
    ChainId,
    Fetcher,
    WETH,
    Route,
    Trade,
    TradeType,
    TokenAmount
} from "@pancakeswap/sdk";
import { BSC_WS_PROVIDER, BSC_TOKEN_ADDRESS, BNB_AMOUNT } from "../config"

export const getExecutionPrice = async () => {

    try {
        const newToken = new Token(ChainId.TESTNET, BSC_TOKEN_ADDRESS, 18)

        let pair = await Fetcher.fetchPairData(newToken, WETH[ChainId.TESTNET], BSC_WS_PROVIDER());
        let route = new Route([pair], WETH[newToken.chainId])
        const trade = new Trade(route, new TokenAmount(WETH[newToken.chainId], BNB_AMOUNT), TradeType.EXACT_INPUT)

        return trade.executionPrice.invert().toSignificant(6)

    } catch (error) {
        console.log("error", error);
    }

}
