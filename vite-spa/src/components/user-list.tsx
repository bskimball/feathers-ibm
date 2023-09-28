import { useQuery } from "@tanstack/react-query";
import { socketClient } from "@lib/utils";
import { User } from "feathers-server/lib/client";

function UserList() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<User[]> => {
      const response = await socketClient.service("users").find();
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{JSON.stringify(error, null, 4)}</div>;

  return (
    <div className="users-list">
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
