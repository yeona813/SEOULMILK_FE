import Employee from "@/components/addUser/Employee";
import Shop from "@/components/addUser/Shop";

const AddUserPage = () => {
  return (
    <div className="gap-4 bg-grayScale-25 pt-[50px] center h-full">
      <Employee />
      <Shop />
    </div>
  );
};

export default AddUserPage;
