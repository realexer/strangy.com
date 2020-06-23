<script>
import {UsersListAPI} from '../../api/Users';

let user = {
    name: '',
    createdAt: null
};

let defaultUser = Object.assign({}, user);

function addUser()
{
    user.createdAt = new Date();

    UsersListAPI.add(user)
    .then(() => {
        user = defaultUser;
    }).catch((e) => {
        alert(e);
    });
}

</script>
<input bind:value={user.name}/>
<button on:click={addUser}>Add User</button>