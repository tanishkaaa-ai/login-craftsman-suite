import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Package, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import inventoryBg from '@/assets/inventory-bg.jpg';

type UserType = 'admin' | 'staff';
type AuthMode = 'login' | 'register';

const AuthPage = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [userType, setUserType] = useState<UserType>('staff');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: `${authMode === 'login' ? 'Login' : 'Registration'} Successful!`,
        description: `Welcome ${userType === 'admin' ? 'Administrator' : 'Staff Member'}!`
      });
      setIsLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${inventoryBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-[2px]" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-bounce" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Welcome Section */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  InventoryPro
                </h1>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Welcome to Your
                <span className="block text-primary">Inventory Hub</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-md mx-auto lg:mx-0">
                Streamline your inventory management with our powerful, intuitive platform designed for modern businesses.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:shadow-card transition-all duration-300">
                <Shield className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-semibold text-foreground">Secure Access</h3>
                <p className="text-sm text-muted-foreground">Enterprise-grade security</p>
              </div>
              <div className="p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:shadow-card transition-all duration-300">
                <Users className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-semibold text-foreground">Team Management</h3>
                <p className="text-sm text-muted-foreground">Role-based permissions</p>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="w-full max-w-md mx-auto">
            <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-card hover:shadow-intense transition-all duration-500">
              <CardHeader className="space-y-4 text-center">
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {authMode === 'login' 
                      ? 'Sign in to access your inventory dashboard' 
                      : 'Join our inventory management platform'
                    }
                  </CardDescription>
                </div>

                {/* User Type Selection */}
                <Tabs value={userType} onValueChange={(value) => setUserType(value as UserType)} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                    <TabsTrigger 
                      value="staff" 
                      className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
                    >
                      <Users className="w-4 h-4" />
                      Staff
                    </TabsTrigger>
                    <TabsTrigger 
                      value="admin" 
                      className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
                    >
                      <Shield className="w-4 h-4" />
                      Admin
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>

              <CardContent>
                <Tabs value={authMode} onValueChange={(value) => {
                  setAuthMode(value as AuthMode);
                  resetForm();
                }} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50">
                    <TabsTrigger value="login" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger value="register" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="admin@inventorypro.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="h-12 bg-input/50 border-border focus:border-primary transition-all duration-300"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="h-12 bg-input/50 border-border focus:border-primary pr-12 transition-all duration-300"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <Button
                        type="submit"
                        variant={userType}
                        size="lg"
                        className="w-full group"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          'Signing In...'
                        ) : (
                          <>
                            Sign In as {userType === 'admin' ? 'Admin' : 'Staff'}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="register" className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground font-medium">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="h-12 bg-input/50 border-border focus:border-primary transition-all duration-300"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="admin@inventorypro.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="h-12 bg-input/50 border-border focus:border-primary transition-all duration-300"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="h-12 bg-input/50 border-border focus:border-primary pr-12 transition-all duration-300"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <Button
                        type="submit"
                        variant={userType}
                        size="lg"
                        className="w-full group"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          'Creating Account...'
                        ) : (
                          <>
                            Create {userType === 'admin' ? 'Admin' : 'Staff'} Account
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                {/* Role Badge */}
                <div className="mt-6 flex justify-center">
                  <Badge 
                    variant="secondary" 
                    className={`px-4 py-2 ${
                      userType === 'admin' 
                        ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30' 
                        : 'bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30'
                    }`}
                  >
                    {userType === 'admin' ? (
                      <>
                        <Shield className="w-3 h-3 mr-1" />
                        Administrator Access
                      </>
                    ) : (
                      <>
                        <Users className="w-3 h-3 mr-1" />
                        Staff Member Access
                      </>
                    )}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;