"use client"
import { useEffect } from 'react';
import Head from 'next/head';

interface BackgroundSetterProps {
  before?: string;
  after: string;
}

const BackgroundSetter: React.FunctionComponent<BackgroundSetterProps> = ({before = "bg-background", after}) => {
  useEffect(() => {
    // document.body.className = "bg-white";
    document.body.className = after;

    return () => {
      document.body.className = before;
    };
  }, []);

  return (
    <>
      {/* Additional head elements can be added here */}
      <Head>
        <style>{`
          /* Additional styles can be added here */
          body {
            margin: 0;
          }
        `}</style>
      </Head>
      {/* Rest of your component */}
      <div>
        {/* Your component content */}
      </div>
    </>
  );

};

export default BackgroundSetter;