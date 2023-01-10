"use strict";

const neo4j = require('neo4j-driver');
const { creds } = require('./../config/creds');
const driver = neo4j.driver('bolt://localhost:7687/', neo4j.auth.basic(creds.neo4jname, creds.neo4jpass));

exports.get_num_nodes = async () => {
    const session = driver.session();
    const num_nodes = await session.run('MATCH (n) RETURN n', {});
    session.close();
    const ret = (!num_nodes ? 0 : num_nodes.records.length)
    console.log("RESULTS:", ret);
    return ret;
};

exports.get_num_users = async () => {
    const session = driver.session();
    const num_users = await session.run('MATCH (u:User) RETURN u');
    session.close();
    console.log(num_users);
    const ret = (!num_users ? 0 : num_users.records.length);
    console.log("Number of users: ", ret);
    return ret;
};

exports.check_if_email_exists = async (email) => {
    const session = driver.session();
    const exists = session.run('MATCH (u:User) WHERE u.email = $email RETURN u', {
        email: email,
    }).then((email) => {
        session.close();
        const ret = (!email.records ? false : true);
        console.log('Email exists: ', ret);
        return ret;
    }).catch((err) => {
        console.error(err);
        return "Failed to check email";
    })
    
    return await exists;
};

exports.check_if_username_exists = async (username) => {
    const session = driver.session();
    const exists = session.run('MATCH (u:User) WHERE u.username = $username RETURN u', {
        username: username,
    }).then((username) => {
        session.close();
        const ret = (!username.records[0] ? false : true);
        console.log('Username exists: ', ret);
        return ret;
    }).catch((err) => {
        console.error(err);
        return "Failed to check username";
    })
    return await exists;
};

exports.create_user = async (email, username, password) => {
    const session = driver.session();
    const user = session.run("MERGE (n:User {email: $email, username: $username, password: $password}) RETURN n", {
        email: email,
        username: username,
        password: password,
    }).then((user) => {
        session.close();
        return user.records[0].get(0).properties.username;
    })
    .catch((err) => {
        console.error(err);
        return "No user was created";
    });

    return await user;
};

exports.delete_user = async (username) => {
    const session = driver.session();
    const deleted = session.run('MATCH (u:User) WHERE u.username = $username DELETE u', {
        username: username,
    }).then((d) => {
        session.close();
        return "User was deleted";
    }).catch((err) => {
        console.error(err);
        return "Failed to delete user";
    })
    
    return await deleted;
} 