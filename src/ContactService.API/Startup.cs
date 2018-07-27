using FluentValidation.AspNetCore;
using ContactService.Core;
using ContactService.Core.Behaviours;
using ContactService.Core.Extensions;
using ContactService.Infrastructure.Extensions;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ContactService.Core.Interfaces;
using ContactService.Infrastructure.Data;

namespace ContactService.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
            => Configuration = configuration;
        
        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IEventStore, EventStore>();
            services.AddHttpContextAccessor();

            services.AddCustomMvc()
                .AddFluentValidation(cfg => { cfg.RegisterValidatorsFromAssemblyContaining<Startup>(); });

            services
                .AddCustomSecurity(Configuration)
                .AddCustomSignalR()
                .AddCustomSwagger()
                .AddDataStore(Configuration["Data:DefaultConnection:ConnectionString"],Configuration.GetValue<bool>("isTest"))
                .AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>))
                .AddMediatR(typeof(Startup).Assembly);
        }

        public void Configure(IApplicationBuilder app)
        {     
            app.UseAuthentication()            
                .UseCors(CorsDefaults.Policy)            
                .UseMvc()
                .UseSignalR(routes => routes.MapHub<IntegrationEventsHub>("/hub"))
                .UseSwagger()
                .UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "ContactService API");
                    options.RoutePrefix = string.Empty;
                });
        }        
    }


}
