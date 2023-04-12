import { useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { useUserAuth } from "../firebase/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./Contexts/jobPostContext";
import JobCardList from "../Components/JobCardList";
import Spinner from "../Components/Spinner";

export default function ListAllJobs() {
    const [, setJobSelected] = useState(false);
    const [jobs, setJobs] = useState([]);
    const { setData } = useContext(DataContext);
    const { user} = useUserAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchJobs();
    }, [])

    const fetchJobs = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "Postings"));
            const newData = querySnapshot.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            }));
            setJobs(newData);
            setIsLoading(false);
        } catch (error) {
            console.log(error.message);
            setIsLoading(false);
        }
    }

    const handleJobCardClick = (jobData) => {
        setJobs(jobs.map((job) => {
            if(job.id === jobData.id) {
                return {
                    ...job,
                    data: {
                        ...job.data,
                        applicants: [...(job.data.applicants || []),user.uid]
                    }
                };
            } else {
                return job;
            }
        }));
        setData({ jobby: jobData });
        setJobSelected(true);
        navigate('/job-post');
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">List of job postings</h1>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="job-card-list-container">
                    {jobs.length ? (
                        <JobCardList jobs={jobs} handleJobCardClick={handleJobCardClick} />
                    ) : (
                        <p>No job postings found.</p>
                    )}
                </div>
            )}
        </>
    )
}


//------------------------------------------------------------------------------------------------------------------------

export function ListJobsFromUID() {
    const [jobs, setJobs] = useState([]);
    const { user } = useUserAuth();
    const [, setJobSelected] = useState(false);
    const { setData } = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(() => {
        FetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {

    }, [jobs])
    const FetchPost = async () => {
        const q = query(collection(firestore, "Postings"), where("EmployerUID", "==", user.uid));
        await getDocs(q)
            .then(querySnapshot => {
                const newData = querySnapshot.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id
                }));
                setJobs(newData);
                
            })
            .catch(error => console.log(error.essage))


    }
    const toJobPost = (jobData) => {
        setData({ jobby: jobData });
        setJobSelected(true);
        navigate('/job-post');
    }
    function getArraySize(arr) {
        if (arr === null || arr === undefined) {
            return "";
        }
        else {
            return Object.keys(arr).length;
        }
    }
    return (
        <>
            <h1 className="table-headers">Your Job Postings</h1>
            <ul>
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Company</th>
                            <th>Salary</th>
                            <th>Applicants</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map(job => <tr onClick={() => { toJobPost(job) }}
                            key={job.id}><td>{job.data.Job}</td><td>{job.data.Company}</td><td>{job.data.Salary}</td><td>{getArraySize(job.data.applicants)}</td></tr>)}
                    </tbody>
                </table>
            </ul>
        </>
    )
}