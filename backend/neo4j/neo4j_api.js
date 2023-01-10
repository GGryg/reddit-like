const neo4j = require('neo4j-driver');
const { cred } = require('./../config/credentials');
const driver = neo4j.driver("bolt://0.0.0.0:7687");

exports.get_num_nodes = async () => {
    const session = driver.session();
    const num_nodes = await session.run('MATCH (n) RETURN n', {});
    session.close();
    console.log('RESULT', (!num_nodes ? 0 : num_nodes.records.length));
    return (!num_nodes ? 0 : num_nodes.records.length);
}

exports.create_user = async () => {
    const session = driver.session();
    let user = "No user was created";
    try{
        user = await session.run('MERGE (n:user {name: $id}) RETURN n', {id: name}); 
    }
    catch(err){
        console.log(err);
        return user;
    }
    return user.records[0].get(0).properties.name;
}