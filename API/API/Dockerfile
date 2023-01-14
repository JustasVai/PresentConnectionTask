FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["API.csproj", "./"]
RUN dotnet restore "./API.csproj"
COPY . .
RUN dotnet build "API.csproj" -c Release -o /API

FROM build AS publish
RUN dotnet publish "API.csproj" -c Release -o /API

FROM base AS final
WORKDIR /API
COPY --from=publish /API .
ENTRYPOINT ["dotnet", "API.dll"]