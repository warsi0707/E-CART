import { Link } from "react-router";

export default function Footer(){
    const currentYear = new Date()
    const year = currentYear.toLocaleDateString('en-IN',{year: "numeric"})
    return (
        <div className="w-full p-3 py-5 md:p-8 bg-primary flex flex-col md:flex-row items-center justify-center gap-5">
            <p className="text-sm">Copyright &copy; {year} E-cart. All Rights Reserved</p>
            <div className="flex gap-3 text-xl items-center">
                <Link to={"#"} title="Linkedin"><i className="fa-brands fa-linkedin"></i></Link>
                <Link to={"#"} title="GitHub"><i className="fa-brands fa-github"></i></Link>
                <Link to={"#"} title="Portfolio"><i className="fa-solid fa-link"></i></Link>
            </div>
        </div>
    )
}