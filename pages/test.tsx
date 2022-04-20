import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const users = await prisma.user.findMany();
  return {
    props: {
      users,
    },
  };
}

async function saveUser(user: any) {
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

const Test = ({ users }: any) => {
  console.log("users", users[0].name);
  return (
    <div>
      <p>{users[0].name}</p>

      {/* {users.map((u: any) => {
        <p>{u.name}</p>;
      })} */}
    </div>
  );
};

export default Test;
