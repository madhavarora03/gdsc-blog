'use client';

import { GithubIcon } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';

const Page = () => {
	

	const { data: session } = useSession();
	if (session) return redirect('/');
	return (
		<div className='min-h-screen flex items-center justify-center '>
			<div className='border-4 border-slate-300 p-8 bg-slate-700/50 rounded-xl  '>
				<h1 className='font-bold text-4xl underline decoration-4 underline-offset-4 px-4 text-center text-slate-300/90  '>
					Sign In
				</h1>
				<button
					className='w-full mt-12 flex items-center bg-slate-800 hover:bg-slate-700 transition-all duration-150 ease-linear p-5 px-10 rounded-2xl '
					onClick={() => signIn('github')}>
					<GithubIcon className='inline h-12 w-12 ' />
					<span className='text-2xl h-full ml-4 font-semibold   '>
						Continue with Github
					</span>
				</button>
			</div>
		</div>
	);
};
export default Page;
