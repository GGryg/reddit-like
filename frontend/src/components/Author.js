import { useGetUsersQuery } from "../reducers/userApiSlice";

const Author = ({userId}) => {
    const { data: users, isSuccess, isLoading } = useGetUsersQuery();
    let content;
    if(isLoading) content = 'Loading';
    else{
    if(isSuccess){
        const user = users.entities[userId];        
        if(!user) content = 'Deleted';
        else content = <div className="text-cText-middle text-sm flex items-center"><img src={`http://localhost:4000/${user.avatar}`} className='w-8 h-8 mx-1 rounded-full' alt="avatar" />u/{user.username}</div>;
    } 
}
    return <>{content}</>
};

export default Author;