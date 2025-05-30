"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Key, Users, Bell, Copy, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [emailUpdates, setEmailUpdates] = useState(false)
  const { toast } = useToast()

  const apiKey = "ml_smith_sk_1234567890abcdef"

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    toast({
      title: "API Key Copied",
      description: "Your API key has been copied to clipboard.",
    })
  }

  const generateNewApiKey = () => {
    toast({
      title: "New API Key Generated",
      description: "Your old API key has been revoked and a new one has been generated.",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center space-x-2 mb-6">
        <SidebarTrigger />
        <h2 className="text-3xl font-bold tracking-tight text-white">Settings</h2>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
          <TabsTrigger value="profile" className="data-[state=active]:bg-slate-700 text-slate-300">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-slate-700 text-slate-300">
            <Key className="mr-2 h-4 w-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-slate-700 text-slate-300">
            <Users className="mr-2 h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-slate-700 text-slate-300">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Profile Information</CardTitle>
              <CardDescription className="text-slate-400">
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-blue-500 text-white text-xl">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="border-slate-600 text-slate-300">
                    Change Avatar
                  </Button>
                  <p className="text-sm text-slate-400 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-300">
                    First Name
                  </Label>
                  <Input id="firstName" defaultValue="John" className="bg-slate-900 border-slate-600 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-300">
                    Last Name
                  </Label>
                  <Input id="lastName" defaultValue="Doe" className="bg-slate-900 border-slate-600 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-slate-300">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>

              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys */}
        <TabsContent value="api" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">API Key Management</CardTitle>
              <CardDescription className="text-slate-400">Manage your API keys for CLI and SDK access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-white font-medium">Production API Key</h3>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Active</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <code className="text-slate-300 bg-slate-800 px-2 py-1 rounded text-sm">
                        {showApiKey ? apiKey : "ml_smith_sk_••••••••••••••••"}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="text-slate-400 hover:text-white"
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyApiKey}
                        className="text-slate-400 hover:text-white"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-slate-400 text-sm mt-1">Created on Dec 15, 2024</p>
                  </div>
                  <Button variant="destructive" size="sm" onClick={generateNewApiKey}>
                    Regenerate
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-white font-medium">Usage Guidelines</h3>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• Keep your API keys secure and never share them publicly</li>
                  <li>• Use environment variables to store API keys in your applications</li>
                  <li>• Regenerate keys immediately if you suspect they've been compromised</li>
                  <li>• Monitor your API usage in the dashboard</li>
                </ul>
              </div>

              <Button variant="outline" className="border-slate-600 text-slate-300">
                Create New API Key
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Management */}
        <TabsContent value="team" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Team Members</CardTitle>
              <CardDescription className="text-slate-400">
                Manage team access and collaboration settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-blue-500 text-white">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-medium">John Doe</p>
                      <p className="text-slate-400 text-sm">john.doe@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Owner</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-500 text-white">
                        SM
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-medium">Sarah Miller</p>
                      <p className="text-slate-400 text-sm">sarah.miller@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      Editor
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Input placeholder="Enter email address" className="bg-slate-900 border-slate-600 text-white" />
                <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                  Invite Member
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Notification Preferences</CardTitle>
              <CardDescription className="text-slate-400">
                Configure how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Pipeline Notifications</h3>
                    <p className="text-slate-400 text-sm">Get notified when your preprocessing pipelines complete</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Email Updates</h3>
                    <p className="text-slate-400 text-sm">Receive product updates and feature announcements</p>
                  </div>
                  <Switch checked={emailUpdates} onCheckedChange={setEmailUpdates} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Team Activity</h3>
                    <p className="text-slate-400 text-sm">Get notified about team member activities</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Security Alerts</h3>
                    <p className="text-slate-400 text-sm">Important security notifications and login alerts</p>
                  </div>
                  <Switch defaultChecked disabled />
                </div>
              </div>

              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
