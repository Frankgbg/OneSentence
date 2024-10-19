/*
* 思源api
*/
async function post_request(api, data) {
    let result
    let url = siyuan_host + api
    await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: 'token ' + siyuan_token,
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
        result = {code: -1, data: {}}
    })
    return result
}

async function set_block_attr(block_id, attrs) {
    let api = '/api/attr/setBlockAttrs'
    let data = {
        id: block_id,
        attrs: attrs,
    }
    let result = await post_request(api, data)
    return result.code
}

async function get_block_attr(block_id) {
    let api = '/api/attr/getBlockAttrs'
    let result = await post_request(api, {id: block_id})
    return result.data
}

function get_current_block_id() {
    try{
        return window.frameElement.parentElement.parentElement.dataset.nodeId
    }catch(error){
        console.error("get_current_block_id error: ", error, "非思源上测试时请忽略")
        return null
    }
}
