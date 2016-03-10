using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(_1lab.Startup))]
namespace _1lab
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
