type TParams = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phoneNo: string;
  country: string;
  city: string;
  pan: string;
  aadhar: string;
};

const Page = ({ searchParams }: { searchParams: TParams }) => {
  console.log(searchParams);
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="border border-black/25 dark:border-white/30 rounded-md">
        <div className="p-6 py-4">
          <h1 className="text-2xl font-bold">Results</h1>
          <p>First Name: {searchParams.firstName}</p>
          <p>Last Name: {searchParams.lastName}</p>
          <p>Username: {searchParams.username}</p>
          <p>Email: {searchParams.email}</p>
          <p>Password: {searchParams.password}</p>
          <p>Phone Number: {searchParams.phoneNo}</p>
          <p>Country: {searchParams.country}</p>
          <p>City: {searchParams.city}</p>
          <p>PAN: {searchParams.pan}</p>
          <p>Aadhar: {searchParams.aadhar}</p>
        </div>
      </div>
    </main>
  );
};

export default Page;
