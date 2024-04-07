import { forwardRef } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Keyboard, Pen } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>ritleikir</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Keyboard className="w-12 h-12" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      ritleikir
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Vilt þú búa til nýjan ritleik, tengjast ritleik hjá vini eða
                      æfa þig í ritleik alveg sjálfur?
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/#" title="Hýsa leik">
                Hýstu nýjan ritleik. - Multiplayer
              </ListItem>
              <ListItem href="/#" title="Tengjast leik">
                Tengstu ritleik sem búið er að hýsa með kóða.
              </ListItem>
              <ListItem href="/type" title="Æfing">
                Æfðu þig í ritleik - Single player
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"