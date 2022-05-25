import { JwtService } from "@nestjs/jwt";

export async function getJwtToken(id: string, jwtService: JwtService){
    const payload = {id};
    const token = await jwtService.sign(payload);
    return token;
}