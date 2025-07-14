import React from "react";


interface StickyCardProps {
  children: React.ReactNode;
}

export const StickyCard: React.FC<StickyCardProps> = ({ children }) => {
  // Convert children to array and check if we have exactly 2 elements
  const childrenArray = React.Children.toArray(children);
  const hasHeader = childrenArray.length === 2;

  // Get header and content elements
  const [headerChild, contentChild] = hasHeader ? childrenArray : [null, childrenArray[0]];


  return (
    <main className="bg-bg-card border border-t-0 border-bd-card rounded-md shadow-sm">

      {hasHeader &&
        <header className="w-full flex flex-col bg-bg-card border-b border-bd-card rounded-t-md sticky top-[-52px] ">
          {headerChild}
        </header>
      }

      {contentChild}

    </main>
  );
}

export function StickyCardHeader() {
  return (
    <header className="w-full sticky top-0 flex z-10 min-h-12">
      <div id="cornerLeft" className="h-[36px] w-[36px] top-[36px] overflow-hidden left-[-12px] absolute z-10">
        <div className="h-[48px] w-[48px]  left-3 top-3 absolute border border-bd-primary border-l-0 rounded-md corner-shadow"></div>
      </div>
      <div className="h-[13px] w-[calc(100%-46px)] absolute top-[36px] border-b border-bd-primary left-6 z-0 ">
        
      </div>
      <div id="cornerRight" className="h-[36px] w-[36px] top-[36px] top-12 overflow-hidden right-[-12px] absolute z-10">
        <div className="h-[48px] w-[48px] right-3  top-3 absolute border border-bd-primary border-r-0 rounded-md corner-shadow"></div>
      </div>

      <div className="w-full z-1 absolute top-0 bg-bg-base h-12 py-4"/>
    </header>
  );
}