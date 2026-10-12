
interface DetailProps {
  name: string;
  phone: string;
  adress: string;
  email: string;
  password: string;
}

const Profile = (obj: DetailProps) => {
  return (
    <>
      {Object.entries(obj).map(([key, val]) => (
        <div key={key}>
          <label htmlFor={key}>{key}</label>
          <input
            type="text"
            id={key}
            readOnly
          />
        </div>
      ))}
    </>
  );
};

export default Profile;
