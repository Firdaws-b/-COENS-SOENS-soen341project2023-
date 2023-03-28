import NavBarProfilePage from '../Components/NavBars/NavBarProfilePage';
import { UserDataContext } from '../Components/userListContext';
import React,{useEffect, useState, useContext} from 'react'
import Wrapper from "../assets/wrappers/ProfilePageFormPage";
import { auth, firestore } from '../firebase/firebase';
import { doc, getDoc, updateDoc,collection, query, where, getDocs, writeBatch, deleteDoc} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";
import FormRow from "../Components/FormRow"
import { Button } from 'react-bootstrap';
import userAvatar from '../assets/user-avatar.jpg';
import { useNavigate } from 'react-router-dom';

export const AdminUserView = () => {
    const { userData } = useContext(UserDataContext);
    const [user, setUser] = useState(null);
    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [companyLogo, setCompanyLogo] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                if(userData.person.data.role === "User")
                {
                    const uid = userData.person.data.uid;
                    const snapshot = await getDoc(doc(firestore, "Users", uid));
                    if (snapshot.exists()) {
                        setUser(snapshot.data())
                        setFirstName(snapshot.data().firstName)
                        setLastName(snapshot.data().lastName)
                        setEmail(snapshot.data().email)
                        setRole(snapshot.data().role)
                        setCountry(snapshot.data().country)
                        setProvince(snapshot.data().province)
                        setAddress(snapshot.data().address)
                        setCity(snapshot.data().city)
                        setResume(snapshot.data().resume)
                    } else {
                        console.log("User doc missing")
                    }
                }
                else if(userData.person.data.role === "Employer")
                {
                const uid = userData.person.data.uid;
                const snapshot = await getDoc(doc(firestore, "Users", uid));
                if (snapshot.exists()) {
                    setUser(snapshot.data())
                    setEmail(snapshot.data().email)
                    setRole(snapshot.data().role)
                    setCompanyName(snapshot.data().companyName)
                    setCompanyLogo(snapshot.data().logoUrl)
                } else {
                    console.log("User doc missing")
                }
            }
            else if(userData.person.data.role === "Admin")
            {
                const uid = user.uid;
                const snapshot = await getDoc(doc(firestore, "Users", uid));
                if (snapshot.exists()) {
                    setUser(snapshot.data())
                    setFirstName(snapshot.data().firstName)
                    setLastName(snapshot.data().lastName)
                    setEmail(snapshot.data().email)
                    setRole(snapshot.data().role)
                
                } else {
                    console.log("User doc missing")
                }
            }

            } else {
                console.log("User not logged in")
                setUser(null);
            }
            setIsLoading(false);
        });
    }, []);

    const handleCompanyNameChange = (event) => {
        setCompanyName(event.target.value);
    
    }
    const handleCompanyLogo = async(event) => {
        const file = event.target.files[0];
        if (!file) {
            alert("Please choose a file to upload first !");
        }
        const uid = userData.person.data.uid;
        const fileExtensionRegex = /(\.jpg|\.jpeg|\.png)$/i;
        const fileExtension = file.name.match(fileExtensionRegex)[0];
        const storageRef = ref(storage, `companyLogo/${uid}.${fileExtension}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        const userRef = doc(firestore,"Users", uid);
        const updatedUser = {...user, logoUrl: url};
        await updateDoc(userRef, updatedUser);
        setCompanyLogo(url);
        setUser(updatedUser);
        alert("Logo of the company added successfully !");
    };
    //-----------------------------------------------------------------------------------------
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [resume, setResume] = useState("");

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    }
    const handleProvinceChange = (event) => {
        setProvince(event.target.value);
    }
    const handleCityChange = (event) => {

        setCity(event.target.value);
    }
    const handleResumeUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            alert("Please choose a file to upload first !");
            //return;
        }
        // if the file exists,create a storage refrence that acts as a pointer to 
        // the file in the cloud. 
        const uid = userData.person.data.uid;
        const storageRef = ref(storage, `resumes/${uid}.pdf`);
        await uploadBytes(storageRef, file);

        const downloadUrl = await getDownloadURL(storageRef);
        const userRef = doc(firestore, "Users", uid);
        const updatedUser = {
            ...user,
            resume: downloadUrl,
        };
        await updateDoc(userRef, updatedUser);
        setUser(updatedUser);
        alert("Resume Uploaded successfully !");
    };
    const handleSaveChanges = async (event) => {
        if(userData.person.data.role === "User")
        {
        event.preventDefault();
        if (!isEditing) {
            return;
        }
        const uid = userData.person.data.role
        const userRef = doc(firestore, "Users", uid)
        const updatedUser = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: role,
            country: country,
            address: address,
            province: province,
            resume: user.resume,
            city: city
        }

        await updateDoc(userRef, updatedUser);
        setUser(updatedUser);
        setIsEditing(false);
    }
    else if(userData.person.data.role === "Employer")
    {
        event.preventDefault();
        if (!isEditing) {
            return;
        }
        const uid = userData.person.data.uid;
        console.log("person : ", userData.person.data.uid);
        const userRef = doc(firestore, "Users", uid);
        
        const postingRef =collection(firestore,'Postings');
        console.log(postingRef);
        
        const query_ = query(postingRef, where("EmployerUID","==",userData.person.data.uid));
        const querySnapshot = await getDocs(query_);
        const batch = writeBatch(firestore);
        querySnapshot.forEach(doc => {
            const docRef = doc.ref;
            batch.update(docRef, {Company:companyName,CompanyLogo: companyLogo});
        });
        await batch.commit();
        const updatedUser = {
            email: email,
            role: role,
            companyName: companyName,
            logoUrl:companyLogo
        }

        await updateDoc(userRef, updatedUser);
        setUser(updatedUser);
        setIsEditing(false);
    }
    else if(userData.person.data.role === "Admin")
    {
        event.preventDefault();
        if (!isEditing) {
            return;
        }
        const uid = userData.person.data.role
        const userRef = doc(firestore, "Users", uid)
        const updatedUser = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: role
        }

        await updateDoc(userRef, updatedUser);
        setUser(updatedUser);
        setIsEditing(false);
    }
    }
    const handleDelete = async () => {
        await deleteDoc(doc(firestore, "Users", userData.person.data.uid));
        navigate("/list-users");
      }
    //-----------------------------------------------------------------------------------------

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if(userData.person.data.role === "Employer")
    {
  return (
    <>
        <NavBarProfilePage/>
        <div>adminUserView</div>
        <div>
            <Wrapper>
                <form className='form' onSubmit={handleSaveChanges}>
                    <h3>My Profile</h3>
                    <div className='form-center'>
                        <div className="avatar-container">
                                <label htmlFor='company-logo-file-input'>
                                    <img src={companyLogo ? companyLogo : userAvatar} alt="Company logo"        className="logo" />
                                    </label>
                        </div>
                        <span>{<br />}</span>
                        <span>{<br />}</span>
                        <span>{<br />}</span>
                        <FormRow type="text" name="Email Address" value={email} handleChange={handleEmailChange} disabled={!isEditing} />
                        <span>{<br />}</span>
                        <span>{<br />}</span>
                        <FormRow type="text" name="Company Name" value={companyName} handleChange={handleCompanyNameChange} disabled={!isEditing} />
                        <span>{<br />}</span>
                        <span>{<br />}</span>
                        <span>{<br />}</span>
                    </div>
                    <Button variant="primary" onClick={() => setIsEditing(!isEditing)} style={{ marginRight: "10px" }}>
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges} style={{ marginRight: "10px" }}>
                        Save
                    </Button>
                    <Button  variant='primary' onClick={handleDelete} style={{ borderColor:'#cc0000',backgroundColor:'#cc0000', marginRight: "10px" }}>
                            Delete User
                        </Button>
                    <label htmlFor="logo-upload" className="btn btn-primary">
                        Edit Company's Logo
                        <input
                            type="file"
                            id="logo-upload"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleCompanyLogo}
                            style={{ display: "none" }} />
                    </label>
                </form>
            </Wrapper>
        </div>

    </>
  )
    }
    else if(userData.person.data.role === "User")
    {
        return (
            <div>
                <NavBarProfilePage />
                <Wrapper>
                    <form className='form' onSubmit={handleSaveChanges}>
                        <h3>My Profile</h3>
                        <div className='form-center'>
                            <FormRow type="text" name="First name" value={firstName} handleChange={handleFirstNameChange} disabled={!isEditing} />
                            <FormRow type="text" name="Last name" value={lastName} handleChange={handleLastNameChange} disabled={!isEditing} />
                            <div className="avatar-container">
                                <img src={userAvatar} alt="User Avatar" className="avatar" />
                            </div>
                            <FormRow type="text" name="Email Address" value={email} handleChange={handleEmailChange} disabled={!isEditing} />
                            <FormRow type="text" name="Address" value={address} handleChange={handleAddressChange} disabled={!isEditing} />
                            <span>{<br />}</span>
                            <FormRow type="text" name="City" value={city} handleChange={handleCityChange} disabled={!isEditing} />
                            <FormRow type="text" name="State/Province" value={province} handleChange={handleProvinceChange} disabled={!isEditing} />
                            <span>{<br />}</span>
                            <FormRow type="text" name="Country" value={country} handleChange={handleCountryChange} disabled={!isEditing} />
                        </div>
                        <span>{<br />}</span>
                        <Button variant="primary" onClick={() => setIsEditing(!isEditing)} style={{ marginRight: "10px" }}>
                            {isEditing ? "Cancel" : "Edit"}
                        </Button>
                        <Button variant="primary" onClick={handleSaveChanges} style={{ marginRight: "10px" }}>
                            Save
                        </Button>
                        <Button  variant='primary' onClick={handleDelete} style={{ borderColor:'#cc0000',backgroundColor:'#cc0000', marginRight: "10px" }}>
                            Delete User
                        </Button>
                        <label htmlFor="resume-upload" className="btn btn-primary">
                            Upload My Resume
                            <input
                                type="file"
                                id="resume-upload"
                                accept=".pdf"
                                onChange={handleResumeUpload}
                                style={{ display: "none" }} />
                        </label>
                    </form>
                </Wrapper>
            </div>
        );

    }
    else if(userData.person.data.role === "Admin")
    {
        return (
            <div>
                <NavBarProfilePage />
                <Wrapper>
                    <form className='form' onSubmit={handleSaveChanges}>
                        <h3>Admin Profile</h3>
                        <div className="avatar-container">
                                <img src={userAvatar} alt="User Avatar" className="avatar" />
                            </div>
                        <div className='form-center'>
                            <FormRow type="text" name="First name" value={firstName} disabled={true} />
                            <FormRow type="text" name="Last name" value={lastName} disabled={true} />
                            <FormRow type="text" name="Email Address" value={email}x disabled={true} />
                        
                        </div>
                        <span>{<br />}</span>

                        
                    </form>
                </Wrapper>
            </div>
        );
    }
    else{
        return(
            <>
            <h1>failed</h1>
            <h2>{userData.person.data.uid}</h2>
            </>
        )
    }
}
