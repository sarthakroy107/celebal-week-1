"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type TError = {
  field:
    | "firstName"
    | "lastName"
    | "username"
    | "email"
    | "password"
    | "phoneNo"
    | "country"
    | "city"
    | "pan"
    | "aadhar"
    | null;
  message: string | null;
};

const Form = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [pan, setPan] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [error, setError] = useState<TError>({
    field: null,
    message: null,
  });

  const handlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      username,
      email,
      password,
      phoneNo,
      country,
      city,
      pan,
      aadhar,
    });

    if (!firstName) {
      setError({ field: "firstName", message: "First name is required" });
      return;
    }
    if (!lastName) {
      setError({ field: "lastName", message: "Last name is required" });
      return;
    }
    if (!username) {
      setError({ field: "username", message: "Username is required" });
      return;
    }
    if (!email || !emailRegex.test(email)) {
      setError({ field: "email", message: "Email is required" });
      return;
    }
    if (!password) {
      setError({ field: "password", message: "Password is required" });
      return;
    }
    if (!phoneNo || phoneNo.length < 12 || phoneNo.length > 13) {
      setError({
        field: "phoneNo",
        message: "Phone number with country code is required",
      });
      return;
    }
    if (!country) {
      setError({ field: "country", message: "Country is required" });
      return;
    }
    if (!city) {
      setError({ field: "city", message: "City is required" });
      return;
    }
    if (!pan) {
      setError({ field: "pan", message: "PAN is required" });
      return;
    }
    if (!aadhar) {
      setError({ field: "aadhar", message: "Aadhar is required" });
      return;
    }

    router.push(
      `/results?firstName=${firstName}&lastName=${lastName}&username=${username}&email=${email}&password=${password}&phoneNo=${phoneNo}&country=${country}&city=${city}&pan=${pan}&aadhar=${aadhar}`
    );
  };

  useEffect(() => {
    setError({ field: null, message: null });
    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      username.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      phoneNo.length > 0 &&
      country.length > 0 &&
      city.length > 0 &&
      pan.length > 0 &&
      aadhar.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    setError({ field: null, message: null });
  }, [
    firstName,
    lastName,
    username,
    email,
    password,
    phoneNo,
    country,
    city,
    pan,
    aadhar,
  ]);

  useEffect(() => {
    if (error.field) {
      setButtonDisabled(true);
    }
  }, [error]);

  return (
    <form
      onSubmit={handlSubmit}
      className="w-96 border border-black/25 dark:border-white/30 rounded-md p-6 py-4"
    >
      <TextInput
        label="First name"
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        errorMessage={error.message}
        hasErrorOccured={error.field === "firstName"}
      />
      <TextInput
        label="Last name"
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        errorMessage={error.message}
        hasErrorOccured={error.field === "lastName"}
      />
      <TextInput
        label="Username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        errorMessage={error.message}
        hasErrorOccured={error.field === "username"}
      />
      <TextInput
        label="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        errorMessage={error.message}
        hasErrorOccured={error.field === "email"}
      />
      <PasswordInput
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        errorMessage={error.message}
        hasErrorOccured={error.field === "password"}
      />
      <TextInput
        label="Phone number"
        type="tel"
        onChange={(e) => setPhoneNo(e.target.value)}
        errorMessage={error.message}
        hasErrorOccured={error.field === "phoneNo"}
      />
      <SelectInput
        label="Country"
        onChange={(e) => setCountry(e.currentTarget.value)}
        arrayList={["India", "USA", "UK", "Australia"]}
        hasErrorOccured={error.field === "country"}
        errorMessage={error.message}
      />
      <SelectInput
        label="City"
        onChange={(e) => setCity(e.currentTarget.value)}
        arrayList={
          country === "India"
            ? ["Mumbai", "Delhi", "Bangalore"]
            : country === "USA"
            ? ["New York", "Los Angeles", "Chicago"]
            : country === "UK"
            ? ["London", "Manchester", "Birmingham"]
            : country === "Australia"
            ? ["Sydney", "Melbourne", "Brisbane"]
            : []
        }
        hasErrorOccured={error.field === "city"}
        errorMessage={error.message}
      />
      <TextInput
        label="PAN"
        type="text"
        onChange={(e) => setPan(e.target.value)}
        hasErrorOccured={error.field === "pan"}
        errorMessage={error.message}
      />
      <TextInput
        label="Aadhar"
        type="text"
        onChange={(e) => setAadhar(e.target.value)}
        hasErrorOccured={error.field === "aadhar"}
        errorMessage={error.message}
      />

      <button
        type="submit"
        disabled={buttonDisabled}
        className="w-full h-10 bg-blue-500 text-white rounded-md disabled:opacity-40"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;

type TInputField = {
  label: string;
  type: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string | null;
  hasErrorOccured: boolean;
};

function TextInput(TProps: TInputField) {
  return (
    <div className="w-full flex flex-col items-start my-1 space-y-1">
      <label htmlFor={TProps.label}>{TProps.label}</label>
      <input
        className="w-full rounded-sm py-1 px-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 text-black dark:text-white bg-transparent border border-black/25 dark:border-white/30"
        type={TProps.type}
        name={TProps.label}
        placeholder={TProps.placeholder}
        onChange={TProps.onChange}
      />
      <p className="text-rose-500 text-sm h-3">
        {TProps.hasErrorOccured && TProps.errorMessage}
      </p>
    </div>
  );
}

function PasswordInput(TProps: TInputField) {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full relative">
      <TextInput {...TProps} type={show ? "text" : "password"} />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-2 top-8 text-sm text-blue-500 cursor-pointer"
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}

type TSelectInput = {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  arrayList: string[];
  hasErrorOccured: boolean;
  errorMessage: string | null;
};

function SelectInput(TProps: TSelectInput) {
  return (
    <div className="w-full flex flex-col items-start my-1 space-y-1">
      <label htmlFor="country">{TProps.label}</label>
      <select
        onChange={TProps.onChange}
        className="bg-transparent border border-black/25 dark:border-white/30 w-full px-2 py-1 rounded-md"
      >
        <option value="" className="hidden">
          No selected
        </option>
        {TProps.arrayList.map((country) => (
          <option
            className="bg-transparent text-white dark:text-black border border-black/25 dark:border-white/30"
            key={country}
            value={country}
          >
            {country}
          </option>
        ))}
      </select>
      <p className="text-rose-500 text-sm h-3">
        {TProps.hasErrorOccured && TProps.errorMessage}
      </p>
    </div>
  );
}
