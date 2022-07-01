import { ReactNode } from "react";
import {
  Button,
  Expander,
  ExpanderContent,
  ExpanderTitleButton,
} from "suomifi-ui-components";
import MobileDevice from "../MobileDevice/MobileDevice";
import ShowcaseBox from "../ShowcaseBox/ShowcaseBox";
import React from "react";
import ComponentCode from "./ComponentCode";

type ComponentExampleVariant = "normal" | "mobile_device";

interface ComponentExampleProps {
  filterPropsInExample?: string[];
  variant?: ComponentExampleVariant;
  children: ReactNode[] | ReactNode;
  codeString?: string;
}

const getWithoutWrappers = (children: any): ReactNode[] =>
  React.Children.map(children, (child) =>
    !!child.type && (child.type === "div" || child.type.displayName === "div")
      ? getWithoutWrappers(child.props.children)
      : child
  );

const ComponentExample: React.FunctionComponent<ComponentExampleProps> = ({
  children,
  variant,
  filterPropsInExample,
  codeString,
}) => {
  const showcase =
    variant === "mobile_device" ? (
      <ShowcaseBox style={{ paddingBottom: 0 }}>
        <MobileDevice>{children}</MobileDevice>
      </ShowcaseBox>
    ) : (
      <ShowcaseBox>{children}</ShowcaseBox>
    );
  return (
    <>
      {showcase}
      <Expander className="mt-l">
        <ExpanderTitleButton>Koodiesimerkki (React)</ExpanderTitleButton>
        <ExpanderContent>
          {codeString ? (
            <ComponentCode codeString={codeString} />
          ) : (
            getWithoutWrappers(children).map((child, index) => (
              <ComponentCode
                key={index}
                filterProps={filterPropsInExample}
                style={{
                  paddingTop: index === 0 && !codeString ? "1rem" : 0,
                }}
              >
                {child}
              </ComponentCode>
            ))
          )}
        </ExpanderContent>
      </Expander>
    </>
  );
};

export default ComponentExample;
