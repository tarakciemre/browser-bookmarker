const test = require('node:test');
const assert = require("assert");
const axios = require("axios")

const baseURL = "https://browser-bookmarker-backend.vercel.app"
let token = ""
let bookmarkId;
const sampleUser = {
    name: "Haluk",
    username: "Haluk_A",
    password: "1234"
}

test('Failed Login', async (t) => {
    try {
        response = await axios.post(baseURL + '/login', {
            username: sampleUser.username,
            password: sampleUser.password
        })
    } catch (e) {
        assert.strictEqual(e.response.status, 401)
    }
});

test('Create User', async (t) => {
    const response = await axios.post(baseURL + '/user', {
        name: sampleUser.name,
        username: sampleUser.username,
        password: sampleUser.password
    })
    assert.strictEqual(response.status, 201)
});

test('Login', async (t) => {
    const response = await axios.post(baseURL + '/login', {
        username: sampleUser.username,
        password: sampleUser.password
    })
    assert.strictEqual(response.status, 200)
    token = response.data.token
});

test('Get Bookmarks', async (t) => {
    const response = await axios.get(baseURL + "/bookmarks/" + sampleUser.username, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    assert.strictEqual(response.status, 200)
    assert.strictEqual(response.data.length, 0)
});

test('Add Bookmark', async (t) => {
    const response = await axios.post(baseURL + "/bookmark",
    {
        "username": sampleUser.username,
        "url": "https://www.google.com"
    },
    {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    assert.strictEqual(response.status, 200)
    
    const newResponse = await axios.get(baseURL + "/bookmarks/" + sampleUser.username, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    assert.strictEqual(newResponse.data.length, 1)
    bookmarkId = newResponse.data[0].id
});

test('Delete Bookmark', async (t) => {
    const response = await axios.delete(baseURL + "/bookmark/" + bookmarkId,
    {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    assert.strictEqual(response.status, 200)

    const newResponse = await axios.get(baseURL + "/bookmarks/" + sampleUser.username, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    assert.strictEqual(newResponse.data.length, 0)
});

test('Delete User', async (t) => {
    const response = await axios.delete(baseURL + "/user/" + sampleUser.username, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    assert.strictEqual(response.status, 200)
});

test('Failed Login', async (t) => {
    try {
        response = await axios.post(baseURL + '/login', {
            username: sampleUser.username,
            password: sampleUser.password
        })
    } catch (e) {
        assert.strictEqual(e.response.status, 401)
    }
});
