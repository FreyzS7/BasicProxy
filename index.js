// Copyright (c) 2024 iiPython

// List of domains
// Would of preferred to use JSON, but CF doesn't allow `require("fs")`
const domains = [
    "apis",
    "assetdelivery",
    "avatar",
    "badges",
    "catalog",
    "chat",
    "contacts",
    "contentstore",
    "develop",
    "economy",
    "economycreatorstats",
    "followings",
    "friends",
    "games",
    "groups",
    "groupsmoderation",
    "inventory",
    "itemconfiguration",
    "locale",
    "notifications",
    "points",
    "presence",
    "privatemessages",
    "publish",
    "search",
    "thumbnails",
    "trades",
    "translations",
    "users"
]

// Export our request handler
export default {
    async fetch(request) {
        const url = new URL(request.url);
        const path = url.pathname.split(/\//);

        if (!path[1].trim()) 
            return new Response(JSON.stringify({ message: "Missing ROBLOX subdomain." }), { status: 400 });

        if (!domains.includes(path[1])) 
            return new Response(JSON.stringify({ message: "Specified subdomain is not allowed." }), { status: 401 });

        const headers = new Headers(request.headers);
        headers.delete("host");
        headers.delete("roblox-id");
        headers.delete("user-agent");
        headers["user-agent"] = "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36";

        // Add the Roblox authentication cookies if available
        const authCookie = '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_A5C327EB761E07FCB85D0851B0BA8989719B1703E220C9F0F5097200FEAC156A69BA0D3A34DBD361440CD90482A7D690BD82378B51BD84BEC71E5BCCAF3A8C62760D8005AFF98D79D7A882FFC7A8964C8BF296EA02561CA6B6EF26CB1A1DB015E9E2574EE47B1D860BFDC4F7650346006E6C72EEDFBACB4D53A07CD5989FF30E741938038675D7CC92E1A224035E28C538A722D0D5AFEBB71202B2D923FE7ED9CF6A751DA65EF8B356C607C6C7DC7B5F0EECB0C173DC3CE6EC674D21D34BD4E1C7C58CE0F77D284240E479E4EDC2F3B8FF32E896E9C213D8327E26D68ABA88E6957387E2729BFDF60CCB3D23EDE7BBD797B179028418D12972CA866E5355417D25FFB6D69555DAE5CBE07103D6A0BE4FB2315E34DDC06F05F5C9ED6F13B4CE0160FC5765E6046495144B4E336744990DBC8B3470B324BA3F0051EA1B41C52580E3330A0A9101AF1327AB0C5B7F35C6F36C311B620BEE55FA94894C6AEC29F306ED161919FB2109ED31AF60327E93C866A7B72C49BF49F54CDE16EA6F5DC41F0F3E082B20A3107C2024B77CED5DC0A3EF84E0FFE9A81827D9AD17B442C49331E84D3E511B92955231CEB0CED981E7DBEE66C2E50A571788C182C6D7A0609DE242064BCE7C3DBC2C722813EDF1063555AE72A15E6D3BB513F3E34A1B3F1AFC1B140FE37F8860C5D5F38B9C81CDD79598BBD7EB8B17FB17871C62CEFB726E5934C425D905475E9439D5627F58F8E28F6AFDF6FD33B841C798B2F3644BD3E6B4B74EF635E033E72EFA5E24E14C008EF6336155B6D82E6EAD963432FFB43A0EB4DC8B67C8DC452F5FC6808192C1318962814C57B33D3FDFE6D03104EEA559FCEB8B644C839FF82AC37F7F7CBBDE7AA0CBC0AED64667D85B61C3A20BADA8E1090430A210D2446932B6E98BECD37AA9227BFE69E692291D4AC10A87F3C9585E9C199AA4C7EF8457CA5453200B23AD1B9CCD995233958ADFFC2AE8FB155D9B48EB190E0AE70E52D56312DAB74978B42A96FC6F1E3DAAA7E94105C4AAD0BF20E96B20F0C69A56926753657D47B275E345E9866CC6037E1C42197C8950CA920664EBD29F86A831975CF22E95CF0C66F1AAEDC7973E251935D6';
        headers.set("cookie", authCookie);

        const init = {
            method: request.method,
            headers,
        };

        if (request.method !== "GET" && request.method !== "HEAD") {
            init.body = await request.text();
        }

        return fetch(`https://${path[1]}.roblox.com/${path.slice(2).join("/")}${url.search}`, init);
    }
};

