"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface NavigationProps {
  onAuthClick?: () => void;
  isLoggedIn?: boolean;
}

export function Navigation({ onAuthClick, isLoggedIn = false }: NavigationProps) {
  const [credits] = useState(7500);

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SkillSwap
          </div>
          
          {isLoggedIn && (
            <div className="hidden md:flex space-x-6">
              <Button variant="ghost">Dashboard</Button>
              <Button variant="ghost">Marketplace</Button>
              <Button variant="ghost">My Barters</Button>
              <Button variant="ghost">Tests</Button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <div className="hidden sm:flex items-center space-x-2">
                <Badge variant="outline" className="text-green-600">
                  {credits.toLocaleString()} Credits
                </Badge>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        AJ
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">Alex Johnson</p>
                      <p className="w-[200px] truncate text-sm text-gray-500">
                        alex@example.com
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                  <DropdownMenuItem>My Skills</DropdownMenuItem>
                  <DropdownMenuItem>Credit History</DropdownMenuItem>
                  <DropdownMenuItem>Help & Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" onClick={onAuthClick}>
                Sign In
              </Button>
              <Button onClick={onAuthClick}>
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}