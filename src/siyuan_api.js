let token = "re0a716a5ufn1acx"

// 思源api
async function post_request(api, data) {
    let result
    let url = siyuan_host + api
    await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: 'token ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        if(!response.ok){
            throw Error(`url: ${url}. status: ${response.status}`)
        }
        result = response.json()
    }).catch(error => {
        console.error("post_request error: ", error)
    })
    return result
}

/**
 * 添加属性（API）
 * @param attrs 属性对象
 * @block_id 挂件id
 * */
async function set_block_attr(block_id, attrs) {
    let api = '/api/attr/setBlockAttrs'
    let data = {
        id: block_id,
        attrs: attrs,
    }
    let result = await post_request(api, data)
    return result.code
}

/**
 * 获取挂件块参数（API）
 * @block_id 挂件id
 * */
async function get_block_attr(block_id) {
    let api = '/api/attr/getBlockAttrs'
    let result = await post_request(api, {id: block_id})
    return result.data
}

/**
 * @return 当前挂件id
 */
function get_current_widget_id() {
    try{
        return window.frameElement.parentElement.parentElement.dataset.nodeId
    }catch(error){
        console.error("get_current_widget_id error: ", error, "非思源上测试时请忽略")
        return null
    }
}