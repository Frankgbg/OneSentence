const HitokotoType = Object.freeze({
    "philosophy":   {type: "k", text: "哲学",},
    "literature":   {type: "d", text: "文学",},
    "poetry":       {type: "i", text: "诗词",},
    "movies":       {type: "h", text: "影视",},
    "animation":    {type: "a", text: "动画",},
    "comic":        {type: "b", text: "漫画",},
    "music163":     {type: "j", text: "网易云",},
    "game":         {type: "c", text: "游戏",},
    "original":     {type: "e", text: "原创",},
    "internet":     {type: "f", text: "网络",},
    "shake_clever": {type: "l", text: "抖机灵",},
    "other":        {type: "g", text: "其他",},
});

/*
* type_key: string|object
*/
async function fetch_hitokoto(type_key = null) {
    try{
        let url = one_sentence_host + "?"
        if(typeof type_key === "string"){
            type_key = {[type_key]: true}
        }
        Object.entries(type_key).forEach(([key, value]) => {
            if(value && HitokotoType.hasOwnProperty(key)){
                url = `${url}c=${HitokotoType[key].type}&`
            }
        })
        console.log(url)
        const response = await fetch(url)
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        // console.log(data)
        return {ok: true, text: data.hitokoto, author: data.from_who, from: data.from}
    }catch(error){
        return {ok: false, error_msg: `一言接口获取失败. ${error}`}
    }
}
